const getErrorsForPromocode = (promocode, arguments) => {
    let errors = [];

    function validateRules(rules, params, valid = true, operator = "&&") {
        let ruleIsValid = null;

        rules.forEach((rule) => {
            if (rule.type === 'reducer') {
                ruleIsValid = validateRules(rule.rules, params, valid, rule.operator);

                if(!ruleIsValid) {
                    errors.push(rule.rules[0].field + ' is not valid')
                }
            } else {
                let assertion;
                switch (rule.comparator) {
                    case '<':
                        assertion = params[rule.field] < rule.value;
                        break;
                    case '>':
                        assertion = params[rule.field] > rule.value;
                        break;
                    case '==':
                        assertion = params[rule.field] == rule.value
                        break;
                }

                switch (operator) {
                    case "&&":
                        ruleIsValid = ruleIsValid ? (ruleIsValid && assertion) : assertion;
                        break;
                    case '||':
                        ruleIsValid = ruleIsValid ? (ruleIsValid || assertion) : assertion;
                        break;
                    default:
                        ruleIsValid = false;
                }
            }
        });


        return ruleIsValid;
    }

    validateRules(promocode.restrictions, arguments);

    return [...new Set(errors)];
}


module.exports = getErrorsForPromocode;