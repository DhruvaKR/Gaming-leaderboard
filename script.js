document.addEventListener('DOMContentLoaded', () => {
    const leaderboardBody = document.getElementById('leaderboard-body');
    const scoreForm = document.getElementById('score-form');
    const playerNameInput = document.getElementById('player-name');
    const playerScoreInput = document.getElementById('player-score');
    const downloadButton = document.getElementById('download-button');

    const leaderboard = [];

    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const playerName = playerNameInput.value.trim();
        const playerScore = parseInt(playerScoreInput.value);

        if (playerName && !isNaN(playerScore)) {
            addScore(playerName, playerScore);
            playerNameInput.value = '';
            playerScoreInput.value = '';
            updateLeaderboard();
        }
    });

    function addScore(name, score) {
        leaderboard.push({ name, score });
        leaderboard.sort((a, b) => b.score - a.score);
    }

    function removePlayer(name) {
        const index = leaderboard.findIndex(player => player.name === name);
        if (index !== -1) {
            leaderboard.splice(index, 1);
            updateLeaderboard();
        }
    }

    function updateLeaderboard() {
        leaderboardBody.innerHTML = '';

        leaderboard.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td><button onclick="removePlayer('${player.name}')">Remove</button></td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    function downloadCSV() {
        const gameName = prompt("Please enter the game name for the leaderboard:");
        if (!gameName) {
            return; // If no game name is provided, do not proceed with the download
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += `Game: ${gameName}\n`;
        csvContent += "Rank,Player Name,Score\n";

        leaderboard.forEach((player, index) => {
            csvContent += `${index + 1},${player.name},${player.score}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${gameName}_leaderboard.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadButton.addEventListener('click', downloadCSV);
    window.removePlayer = removePlayer;
});
