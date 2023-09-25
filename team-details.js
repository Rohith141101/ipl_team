// Function to display team details
function displayTeamDetails() {
    const teamDetails = document.getElementById('teamDetails');
    const playersList = document.getElementById('playersList');

    // Retrieve the selected team index from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedIndex = urlParams.get('index');

    // Retrieve the team data from local storage
    const teams = JSON.parse(localStorage.getItem('teams'));

    // Check if selectedIndex is valid and teams data is available
    if (selectedIndex !== null && teams) {
        // Parse the selected team index as an integer
        const teamIndex = parseInt(selectedIndex);

        // Check if the teamIndex is a valid index in the teams array
        if (teamIndex >= 0 && teamIndex < teams.length) {
            const selectedTeam = teams[teamIndex];

            // Display the team details
            teamDetails.innerHTML = `
            <div class="card">
                <div class="image">
                <img src="${selectedTeam.icon}" alt="${selectedTeam.name}">
                </div>
                <h3>${selectedTeam.name}</h3>
                <div class="content">
                <p>Player Count: ${selectedTeam.playerCount}</p>
                <p>Top Batsman: ${selectedTeam.topBatsman}</p>
                <p>Top Bowler: ${selectedTeam.topBowler}</p>
                <p>Championships Won: ${selectedTeam.championships}</p>
                </div>
                </div>
            `;

            // Display the list of players
            if (selectedTeam.players && selectedTeam.players.length > 0) {
                const playerListHTML = selectedTeam.players.map(player => `
                    <div class="card">
                        <div class="image">
                        <img src="${player.photo}" alt="${player.fullName}">
                        </div>
                        <h3>${player.fullName}</h3>
                        <div class="content">
                        <p>Team: ${player.from}</p>
                        <p>Price: ${player.price}</p>
                        <p>Playing Status: ${player.playingStatus}</p>
                        <p>Role: ${player.role}</p>
                        </div>
                    </div>
                `).join('');

                playersList.innerHTML = playerListHTML;
            } else {
                playersList.innerHTML = '<p>No players in this team.</p>';
            }
        } else {
            teamDetails.innerHTML = '<p>Invalid team index.</p>';
        }
    } else {
        teamDetails.innerHTML = '<p>No team selected or team data not available.</p>';
    }
}

// Initialize the team details page
function init() {
    displayTeamDetails();
}

// Initialize the team details page
init();
