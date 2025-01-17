const fs = require('fs');

function updateRanking(_player) {
    const rankingToBeOrdered = JSON.parse(fs.readFileSync('data/ranking.json', 'utf8'));
    const playerData = {};
    playerData.player = _player.player;
    playerData.lvl = _player.lvl;
    playerData.score = _player.score;

    if (playerData.id && playerData.lvl && playerData.score) {
        rankingToBeOrdered.push(playerData);
        rankingToBeOrdered.sort((a, b) => Number(a.score) > Number(b.score) ? 1 : -1);
        rankingToBeOrdered.reverse();
        removeLowerPositions(rankingToBeOrdered);

        fs.writeFile('data/ranking.json', JSON.stringify(rankingToBeOrdered), function (err) {
            if (!err) {
                return rankingToBeOrdered;
            } else {
                return err;
            }
        });
    }
}

function removeLowerPositions(_array) {
    while (_array.length > 10) {
        _array.pop();
    }
}

module.exports = updateRanking;
