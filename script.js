// Sample data (you can replace this with your data or load from localStorage)
let teams = JSON.parse(localStorage.getItem('teams')) || [];

// Function to save teams to local storage
function saveTeamsToLocalStorage() {
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Function to display all teams on the homepage
function displayAllTeams() {
    const teamsGrid = document.getElementById('teamsGrid');
    teamsGrid.innerHTML = '';

    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.classList.add('card');
        teamCard.innerHTML = `
            <div class="image">
            <img src="${team.icon}" alt="${team.name}">
            </div>
        `;
        teamsGrid.appendChild(teamCard);

        // Add event listener for team card clicks
        teamCard.addEventListener('click', function() {
            navigateToTeamDetailsPage(teams.indexOf(team));
        });
    });

     // Add event listener for "Add Player" button
     const addPlayerBtn = document.getElementById('addPlayerBtn');
     addPlayerBtn.addEventListener('click', function(e) {
         e.stopPropagation()
         const teamIndex = prompt('Enter the index of the team to add a player to (0, 1, 2, etc.):');
         if (!isNaN(teamIndex) && teamIndex >= 0 && teamIndex < teams.length) {
             addNewPlayerToTeam(parseInt(teamIndex));
         } else {
             alert('Invalid team index.');
         }
     });
}

// Function to add a new team using prompts for all properties
function addNewTeam() {
    const teamCode = prompt('Enter the code of the new team:');
    const teamName = prompt('Enter the name of the new team:');
    const teamIcon = prompt('Enter the icon URL of the new team:');
    const playerCount = prompt('Enter the player count for the new team:');
    const topBatsman = prompt('Enter the top batsman for the new team:');
    const topBowler = prompt('Enter the top bowler for the new team:');
    const championships = prompt('Enter the number of championships won by the new team:');

    if (teamCode && teamName && teamIcon && playerCount && topBatsman && topBowler && championships) {
        const newTeam = {
            code:teamCode,
            name: teamName,
            icon: teamIcon,
            playerCount: parseInt(playerCount),
            topBatsman: topBatsman,
            topBowler: topBowler,
            championships: parseInt(championships),
            players: []
        };
        teams.push(newTeam);
        saveTeamsToLocalStorage();
        displayAllTeams();
    } else {
        alert('All properties must be filled.');
    }
}
var addTeamBtn=document.getElementById('addTeamBtn')
addTeamBtn.addEventListener('click', addNewTeam);


// Function to navigate to the team details page with selected team index
function navigateToTeamDetailsPage(selectedIndex) {
    // Serialize the selected team index as a query parameter
    const queryParam = encodeURIComponent(selectedIndex);

    // Redirect to the team details page with the query parameter
    window.location.href = `team-details.html?index=${queryParam}`;
}

// Function to search for teams by team code or team name
function searchTeamsByCodeOrName(query) {
    console.log('Query:', query);
    query = query.toLowerCase()
    
    const searchResult = teams.find(team => {
        console.log('Team Name:', team.name);

        // Check if the query matches the team code or team name
        const matchesName = team.name.toLowerCase().includes(query);
        console.log('Matches Name:', matchesName);

        return matchesName;
    });

    console.log('Search Result:', searchResult);

    if (searchResult) {
        // Display only the found team
        displayAllTeams([searchResult]);
    } else {
        alert('No matching teams found.');
    }
}



// Initialize the website
function init() {
    displayAllTeams();

    // Add event listener for "Add Team" button
    const addTeamBtn = document.getElementById('addTeamBtn');
    addTeamBtn.addEventListener('click', addNewTeam);


     // Add event listener for "Search" button
     const searchButton = document.getElementById('searchButton');
     searchButton.addEventListener('click', function() {
         const searchInput = document.getElementById('searchInput').value;
         searchTeamsByCodeOrName(searchInput);
     });

}
function addNewPlayerToTeam(teamIndex) {
    const team = teams[teamIndex];
    const fullName = prompt('Enter the full name of the new player:');
    const from = prompt('Enter the name of the new team:');
    const photo = prompt('Enter the photo URL of the new player:');
    const price = prompt('Enter the price of the new player:');
    const playingStatus = prompt('Enter the playing status of the new player (Playing or On-bench):');
    const role = prompt('Enter the role of the new player (Batsman, Bowler, or All-rounder):');

    if (fullName && photo && price && playingStatus && role) {
        const newPlayer = {
            fullName,
            photo,
            from,
            price: parseFloat(price)+' '+'cr',
            playingStatus,
            role
        };
        team.players.push(newPlayer);
        saveTeamsToLocalStorage();
        displayAllTeams();
    } else {
        alert('All properties must be filled.');
    }
}

// Initialize the website
init();
