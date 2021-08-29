import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import 'reactjs-popup/dist/index.css'
import {Img, Heading} from './styledComponents'

class RockPaperScissorsGame extends Component {
  state = {opponent: {}, you: {}, score: 0, result: '', setView: false}

  processResult = event => {
    const {choicesList} = this.props
    const [rock, scissors, paper] = choicesList
    let you = {}
    let opponent = {}
    const result = Math.floor(Math.random() * 3)
    console.log(event.target.id)
    switch (event.target.id) {
      case rock.id:
        you = rock
        break
      case scissors.id:
        you = scissors
        break
      case paper.id:
        you = paper
        break
      default:
        you = {}
    }

    switch (result) {
      case 0:
        opponent = rock
        break
      case 1:
        opponent = scissors
        break
      case 2:
        opponent = paper
        break
      default:
        opponent = {}
    }
    this.setState({you, opponent}, this.generateResult)
    return null
  }

  renderInitialView = () => {
    const {choicesList} = this.props
    const [rock, scissors, paper] = choicesList
    return (
      <div>
        <img src={rock.image} alt={rock.id} />
        <button
          onClick={this.processResult}
          id={rock.id}
          data-testid="rockButton"
          type="button"
        >
          Rock
        </button>
        <img src={scissors.image} alt={scissors.id} />

        <button
          id={scissors.id}
          onClick={this.processResult}
          data-testid="scissorsButton"
          type="button"
        >
          Scissors
        </button>
        <img src={paper.image} alt={paper.id} />
        <button
          onClick={this.processResult}
          id={paper.id}
          data-testid="paperButton"
          type="button"
        >
          Paper
        </button>
      </div>
    )
  }

  generateResult = () => {
    const {you, opponent} = this.state
    const {choicesList} = this.props
    const [rock, scissors, paper] = choicesList
    if (
      you === undefined ||
      opponent === undefined ||
      choicesList === undefined
    ) {
      return null
    }
    if (
      (you.id === rock.id && opponent.id === rock.id) ||
      (you.id === scissors.id && opponent.id === scissors.id) ||
      (you.id === paper.id && opponent.id === paper.id)
    ) {
      this.setState(prevState => ({
        result: 'IT IS DRAW',
        setView: true,
        score: prevState.score,
      }))
    } else if (
      (you.id === rock.id && opponent.id === scissors.id) ||
      (you.id === paper.id && opponent.id === rock.id) ||
      (you.id === scissors.id && opponent.id === paper.id)
    ) {
      this.setState(prevState => ({
        result: 'YOU WON',
        setView: true,
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        result: 'YOU LOSE',
        setView: true,
        score: prevState.score - 1,
      }))
    }
    return null
  }

  showResultView = () => {
    const {you, opponent, result} = this.state
    const continueGame = () => {
      this.setState({setView: false, result: ''})
    }

    return (
      <div>
        <h1>You</h1>
        <img src={you.image} alt="your choice" />
        <h1>Opponent</h1>
        <img src={opponent.image} alt="opponent choice" />
        <p>{result}</p>
        <button type="button" onClick={continueGame}>
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {score, you, opponent, setView} = this.state
    console.log(you, opponent)
    return (
      <div>
        <h1>Rock Paper Scissors</h1>
        <Heading>Score {score}</Heading>
        {setView ? this.showResultView() : this.renderInitialView()}
        <Popup
          trigger={<button type="button">Rules</button>}
          position="right center"
        >
          {close => (
            <div>
              <div>
                <Img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </div>
              <RiCloseLine onClick={close} />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}
export default RockPaperScissorsGame
