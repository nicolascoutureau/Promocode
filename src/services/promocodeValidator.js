/**
 * TODO: compare fields based on type (ex: Date)
 *
 * @param rule
 * @param params
 * @returns {boolean}
 */
function isComparisonValid(rule, params) {
    let assertion;

    switch (rule.comparator) {
    case '<':
        assertion = params[rule.field] < rule.value;
        break;
    case '>':
        assertion = params[rule.field] > rule.value;
        break;
    case '==':
        // eslint-disable-next-line eqeqeq
        assertion = params[rule.field] == rule.value;
        break;
    default:
        assertion = false;
    }

    return assertion;
}

/**
 *
 * @param ruleIsValid
 * @param operator
 * @param assertion
 * @returns boolean
 */
function applyBinaryOperator(ruleIsValid, operator, assertion) {
    let valid;

    switch (operator) {
    case '&&':
        valid = ruleIsValid !== null ? (ruleIsValid && assertion) : assertion;
        break;
    case '||':
        valid = ruleIsValid !== null ? (ruleIsValid || assertion) : assertion;
        break;
    default:
        valid = false;
    }

    return valid;
}

/**
 *
 * @param promocode
 * @param args
 * @returns {{valid: *, errors: *[]}}
 */
const getErrorsForPromocode = (promocode, args) => {
    const errors = [];

    function validateRules(rules, params, operator = '&&') {
        let ruleIsValid = null;

        rules.forEach((rule) => {
            if (rule.type === 'reducer') {
                const assertion = validateRules(rule.rules, params, rule.operator);
                ruleIsValid = applyBinaryOperator(ruleIsValid, operator, assertion);

                if (!ruleIsValid) {
                    errors.push(`${rule.rules[0].field} is not valid`);
                }
            } else {
                const assertion = isComparisonValid(rule, params);
                ruleIsValid = applyBinaryOperator(ruleIsValid, operator, assertion);
            }
        });

        return ruleIsValid;
    }

    const valid = validateRules(promocode.restrictions, args);

    return {
        errors: [...new Set(errors)],
        valid,
    };
};

module.exports = getErrorsForPromocode;
