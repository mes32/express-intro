// Simple test harness for file 'client.js'
function client_test_js() {
    let totalTests = 0;
    let totalPass = 0;

    // Running unit tests and logging results to console
    logTestStart();
    // metaTests();

    // Tests for class CurrencyUSD
    unitTest('new CurrencyUSD()', null, new CurrencyUSDError('input must parse to float'));
    unitTest('new CurrencyUSD(\'\')', null, new CurrencyUSDError('input must parse to float'));
    unitTest('new CurrencyUSD(\'not a float\')', null, new CurrencyUSDError('input must parse to float'));
    unitTest('new CurrencyUSD(null)', null, new CurrencyUSDError('input must parse to float'));
    unitTest('new CurrencyUSD(0)', new CurrencyUSD(0));
    unitTest('new CurrencyUSD(\'0\')', new CurrencyUSD(0));
    unitTest('new CurrencyUSD(\'10.333\')', new CurrencyUSD(10.333));
    unitTest('new CurrencyUSD(\'-3.1\')', new CurrencyUSD(3.1));

    // Tests for CurrencyUSD.add()
    unitTest('let a = new CurrencyUSD(0); a.amount', 0.0);
    unitTest('let a = new CurrencyUSD(1); let b = new CurrencyUSD(1); a.add(b); a.amount', 2.0);
    unitTest('let a = new CurrencyUSD(5.555); let b = new CurrencyUSD(-5.555); a.add(b); a.amount', 0.0);
    unitTest('let a = new CurrencyUSD(2.25); let b = new CurrencyUSD(0.5); a.add(b); a.amount', 2.75);

    // Tests for CurrencyUSD.format()
    unitTest('(new CurrencyUSD(\'-3.1\')).format()', '-3.10');
    unitTest('(new CurrencyUSD(\'-3.1\')).format()', (new CurrencyUSD('-3.1')).format());
    unitTest('(new CurrencyUSD(-3.1)).format()', '-3.10');
    unitTest('(new CurrencyUSD(53)).format()', '53.00');
    unitTest('(new CurrencyUSD(25000.333)).format()', '25,000.33');
    unitTest('(new CurrencyUSD(25000.333)).format(true)', '$25,000.33');
    unitTest('(new CurrencyUSD(\'25000.333\')).format(\'true\')', '25,000.33');
    unitTest('(new CurrencyUSD(25000.333)).format(true)', (new CurrencyUSD(25000.333)).format(true));
    unitTest('(new CurrencyUSD(25000.333)).format(false)', (new CurrencyUSD(25000.333)).format(false));

    // Tests for class Employee
    unitTest('new Employee("Grace", "Hopper", "1", "Admiral", "1000")', new Employee("Grace", "Hopper", "1", "Admiral", "1000"));
    unitTest('new Employee("", "Hopper", "1", "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee(null, "Hopper", "1", "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "", "1", "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", null, "1", "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", "", "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", null, "Admiral", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", "1", "", "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", "1", null, "1000")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", "1", "Admiral", "")', null, new EmployeeError('invalid employee data'));
    unitTest('new Employee("Grace", "Hopper", "1", "Admiral", null)', null, new EmployeeError('invalid employee data'));
    unitTest('(new Employee("Grace", "Hopper", "1", "Admiral", 250000.333)).annualSalary.format()', '250,000.33');

    // unitTest('formatAsUSD(53)', '53.00');
    // unitTest('formatAsUSD(1.7)', '1.70');
    // unitTest('formatAsUSD(0)', '0.00');
    // unitTest('formatAsUSD(-50.55)', '-50.55');
    // unitTest('formatAsUSD(25000.333)', '25,000.33');
    logTestSummary();

    // Run a single unit test
    function unitTest(expressionStr, expected, expectedError) {
        totalTests++;
        try {
            let result = eval(expressionStr);

            if (expectedError) {
                // [Failed] Exception was expected, but none was thrown
                logFailOnException(expressionStr, expectedError, null);
                return false;
            } else if (result !== expected && (!isNaN(result) || !isNaN(expected))) {
                // [Failed] Expected result was not produced
                // Note: Requires special check for NaN, since NaN != NaN
                logFail(expressionStr, expected, result);
                return false;
            }
        } catch (actualError) {
            if (!errorsEqual(actualError, expectedError)) {
                // [Failed] Actual exception does not match expected
                logFailOnException(expressionStr, expectedError, actualError);
                return false;
            }
        }
        // [Passed]
        totalPass++;
        return true;
    }

    // Checks if two error ojects have the same 'name' and 'message'
    function errorsEqual(err1, err2) {
        // TODO: The following 'instanceof' check seems like it should work, but
        // causes some error inside jQuery that I can't figure out.

        // if (!(err1 instanceof Error) || !(err2 instanceof Error)) {
        //     throw 'errorsEqual cannot run with non-Error inputs';
        // }
        try {
            if (err1.name === err2.name) {
                if (err1.message === err2.message) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    // Produces a nicely formatted summary of a failed unit test and logs it to 
    // the console.
    function logFail(expressionStr, expected, result) {
        console.log('Failed unit test');
        console.log('    ---');
        console.log('    expression: ' + expressionStr);
        console.log('    expected: ' + expected);
        console.log('    actual: ' + result);
        console.log('    ...');
    }

    // Produces a nicely formatted summary of a failed unit test (involving an 
    // exception) and logs it to the console.
    function logFailOnException(expressionStr, expectedException, resultException) {
        console.log('Failed unit test on exception');
        console.log('    ---');
        console.log('    expression: ' + expressionStr);
        console.log('    expected throws: ' + expectedException);
        console.log('    actual throws: ' + resultException);
        console.log('    ...');
    }

    // Log the start of the unit tests with some nicely formated text
    function logTestStart() {
        console.log('# Start unit testing');
    }

    // Log results of the unit tests along with the number of tests 
    // passed/failed.
    function logTestSummary() {
        console.log('');
        console.log(`# Results for ${totalTests} tests`);
        console.log(`${totalPass} pass`);
        console.log(`${totalTests - totalPass} fail`);
    }

    // Attempts to test the unitTest function
    function metaTests() {
        unitTest('true', true);
        unitTest('true', true, undefined);
        unitTest('false', false);
        unitTest('false', false, undefined);
        unitTest('\'true\'', 'true');
        unitTest('1 + 1', 2);
        unitTest('1 + 1 // Should fail', 5); // Should fail
        unitTest('1 + 1 // Should fail', 2, new Error('Some exception')); // Should fail
        unitTest('1 + 1 // Should fail', 2, 99999); // Should fail
        unitTest('5 / 0', Infinity);
        unitTest('parseInt(\'90.45\')', 90);
        unitTest('NaN', NaN);
        unitTest('parseInt(\'foobar\')', NaN);
        unitTest('throw \'Some exception\'', null, 'Some exception');
        unitTest('throw new Error(\'Some exception\')', null, new Error('Some exception'));
        unitTest('adddlert()', null, new ReferenceError('adddlert is not defined'));
    }
}