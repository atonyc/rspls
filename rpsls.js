class HighScoreRow extends React.Component {
	render(){
		return <li>{this.props.player} {this.props.score}</li>;
	}
}

class HighScoreBox extends React.Component{
	render(){

		var rows = [];
    this.props.scores.forEach(function(score) {
      rows.push(<HighScoreRow player={score.player} score={score.score} key={score.player} />);
    });

		return <div id="highscores">
      <div>Top Streaks</div>
      <ol>{rows}</ol></div>
	}

}

class TitleBox extends React.Component {
	render(){
		return <h1>Rock &bull; Paper &bull; Scissors &bull; Lizard &bull; Spock</h1>;
	}
}

class RulesBox extends React.Component {
	render(){
		return <div className="rules" id="rules">
      Click an image to play. The rules are:
      <ul>
        <li>rock crushes lizard</li>
        <li>rock crushes scissors</li>
        <li>paper covers rock</li>
        <li>paper disproves spock</li>
        <li>scissors cuts paper</li>
        <li>scissors decapitate lizard</li>
        <li>lizard poisons spock</li>
        <li>lizard eats paper</li>
        <li>spock smashes scissors</li>
        <li>spock vaporizes rock</li>
      </ul>
    </div>;
	}
}

class ResultsBox extends React.Component {
	render(){
		return <div className="results" id="results"></div>;
	}
}




class ItemsBox extends React.Component {
	getComponent(e, item) {

  		var items = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  		var cpu = items[Math.floor(Math.random()*items.length)];

    	var isWinner = didIWin(item, cpu);
		var output;

		output = 'You picked '+ item+'.<br>';
		output += 'Computer picked '+ cpu+'.<br>';

		if (item == cpu) {
			output += 'A tie!<br>';
		}else if (isWinner) { 
			//output += 'You win! Current streak: !<br>'; 
			output += 'You win!<br>';  
		}else{ 
			output += 'You lose!<br>'; 
		}

		output += '<br>';

		document.getElementById('results').insertAdjacentHTML("afterbegin", output);

   }
	render(){
		return <div id="gameplay"><div id="choices">
    	<img src={'assets/rock.png'} alt="Rock" onClick={(e) => this.getComponent(e, 'rock')} />
    	<img src={'assets/paper.png'} alt="Paper" onClick={(e) => this.getComponent(e, 'paper')} />
    	<img src={'assets/scissors.png'} alt="Scissors" onClick={(e) => this.getComponent(e, 'scissors')} />
    	<img src={'assets/lizard.png'} alt="Lizard" onClick={(e) => this.getComponent(e, 'lizard')} />
    	<img src={'assets/spock.png'} alt="Spock" onClick={(e) => this.getComponent(e, 'spock')} />
    	</div>
    	</div>;
	}
}


class MyGame extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      currentStreak: 0,
      selectedItem: null,

    };
}
    
  render() {
    return (
      <div>
        <TitleBox />
        <RulesBox />
        <ItemsBox />
        <ResultsBox />
      </div>
    );
  }
}


var SCORES = [
	{ player: 'Leonard', score: '2' },
	{ player: 'Penny', score: '1' },
];
 
ReactDOM.render(
  <MyGame scores={SCORES} />,
  document.getElementById('container')
);

/* determine who won the flip */
function didIWin(item, cpu){
  	var isWinner = false;
	switch (item) {
	    case 'rock':
	    	if (cpu == 'lizard' || cpu == 'scissors') {
	    		isWinner = true;
	    	}
	        break;
	    case 'paper':
	        if (cpu == 'rock' || cpu == 'spock') {
	    		isWinner = true;
	    	}
	        break;
	    case 'scissors':
	        if (cpu == 'paper' || cpu == 'lizard') {
	    		isWinner = true;
	    	}
	        break;
	    case 'lizard':
	        if (cpu == 'spock' || cpu == 'paper') {
	    		isWinner = true;
	    	}
	        break;
	    case 'spock':
	        if (cpu == 'scissors' || cpu == 'rock') {
	    		isWinner = true;
	    	}
	        break;
	}

      console.log(item);
      console.log(cpu);
      console.log(isWinner);
	return isWinner;
}