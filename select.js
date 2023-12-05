document.addEventListener('DOMContentLoaded', function() {
    const fighters = document.querySelectorAll('.fighter');
    const selectedFighterDisplay = document.getElementById('selectedFighter');
  
    fighters.forEach((fighter) => {
      fighter.addEventListener('click', function() {
        const selectedFighter = fighter.textContent;
        selectedFighterDisplay.textContent = selectedFighter;
        // Perform other actions when a fighter is selected (e.g., load fighter image, stats, etc.)
      });
    });
  });