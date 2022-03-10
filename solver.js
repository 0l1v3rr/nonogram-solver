export default function solve(x, y, width, height) {
    const strToNum = (text) => {
        return text.split(/\s+/).map(Number).filter(Boolean);
    }
    
    x = x.map(strToNum);
    y = y.map(strToNum);
    
    const board = new Array(height).fill(null).map(() => new Array(width).fill(false));

    const findSolution = (i, j) => {
        if (i === height) return true;

        const nextI = i + (j + 1 === width ? 1 : 0);
        const nextJ = (j + 1) % width;

        board[i][j] = true;

        if (verify(board, i, j) && findSolution(nextI, nextJ)) {
            return true;
        }
        board[i][j] = false;
        if (verify(board, i, j) && findSolution(nextI, nextJ)) {
            return true;
        }
        return false;
    };

    const verify = (board, i, j) => {
        return (verifyRow(x[j], height, i, idx => board[idx][j]) && verifyRow(y[i], width, j, idx => board[i][idx]));
    };

    const verifyRow = (requirements, maxLength, length, getter) => {
        let k = 0;
        let acc = 0;
        let isLast = false;

        for (let i = 0; i <= length; i++) {
            if (getter(i)) {
                acc++;
                if (!isLast) {
                    if (k >= requirements.length) {
                        return false;
                    }
                }
                isLast = true;
            } else {
                if (isLast) {
                    if (requirements[k] !== acc) {
                        return false;
                    }
                    acc = 0;
                    k++;
                }
                isLast = false;
            }
        }

        if (length === maxLength - 1) {
            if (isLast) {
                return k === requirements.length - 1 && acc === requirements[k];
            } else {
                return k === requirements.length;
            }
        } else {
            if (isLast) {
                return acc <= requirements[k];
            } 
        }

        return true;
    };

    if (findSolution(0, 0)) {
        return board;
    }

    return null;
}