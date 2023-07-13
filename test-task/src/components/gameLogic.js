const checkIfTurnPossible = (total, aiVal) => {
    for (let i = aiVal; i >= 0; i--) {
        if (total - i >= 0) return i;
    }
    return 0;
}

export const logic = (playerCount, total, currentVal) => {
    let aiVal = 0;
    let res = 0;
    try {
        switch (currentVal) {
            case 1:
                aiVal = 2;
                res = checkIfTurnPossible(total, aiVal);
                if (res == 0) break;
                total -= res;
                aiVal = res;
                break;

            case 2:
                aiVal = 1;
                res = checkIfTurnPossible(total, aiVal);
                if (res == 0) break;
                total -= res;
                aiVal = res;
                break;

            case 3:
                aiVal = 3;
                res = checkIfTurnPossible(total, aiVal);
                if (res == 0) break;
                total -= res;
                aiVal = res;
                break;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
    return [aiVal, total]
}