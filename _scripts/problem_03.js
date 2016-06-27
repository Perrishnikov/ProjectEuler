var problem_03 = {

    problemNum : "3",
    title : "Largest prime factor",
    text : "The prime factors of 13,195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600,851,475,143?",
    link : "https://projecteuler.net/problem=3",
    solution : "6857",
    inputPrimaryName : "Value to solve for",
    inputSecondaryName : null,
    elements : null,

    script : function(userVal01){

        console.log("problem_03 in action");

        var maxNum = userVal01; // value user inputs
        var maxNum1 = 13195;
        var maxNum2 = 123456;
        var maxNum3 = 600851475143; //600,851,475,143  // 71*839*1471*6857
        var maxNum4 = 9007199254740990; // 3*107*28059810762433

        function isValid(value) { //HELPER - validate value
            if (isNaN(value) || value < 1 || value >= Number.MAX_SAFE_INTEGER) {
                console.log("number not valid");
                return false;
            }
            return value;
        }

        function isPrime (value){ //check if this is a prime number
            for(var i = 2; i < value; i++) { //loop throuh all numbers less than input value
                if(value % i === 0) return false; // if the input can divide evenly by any number less than the 'i', it is false
            }
            if (value > 1) return value; //return the prime Number greater than 1 because all numbers are divisible by 1
        }

        function findPrimes(maxNum){ //main function
            if (!maxNum) return false; // if isValid returns false, stop here.

            var primeNumbers = []; // temp array holds all prime numbers
            console.log("---looking for primes of " + maxNum);

            for (var i = 2; i <= maxNum; i++) {
                if (maxNum % i === 0 && isPrime(i)) { //loop through all numbers, if one of these numbers can divide evenly, AND is prime, divide maxNum by the number to make it smaller.
                    maxNum = maxNum/i; //change the loop target
                    primeNumbers.push(i);
                } else if (maxNum % i === 0) { //test code to find even divisors that are not prime
                    // maxNum = maxNum/i;
                    // console.log(i + " is not prime and will not be counted");
                }
            }
            console.log(primeNumbers); // LOG
            return primeNumbers[(primeNumbers.length)]; //RETURN the last item in array to the calling function
        }

        findPrimes(isValid(maxNum));
    }
}
