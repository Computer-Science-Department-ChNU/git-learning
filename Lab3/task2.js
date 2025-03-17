function isPrime(n) {
    if (n < 2) return true;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

let summury = 0;
for (let i = 1; i <= 1000; i++) {
    if (isPrime(i)) {
        summury += i;
    }
}

console.log(summury);