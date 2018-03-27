var React = require('react');
var PropTypes = require('prop-types');
function PlayerPreview(props){
  return (
    <div>
      <div className ='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>  
      </div>
        <button
        className='reset'
        onClick={props.onReset.bind(null,props.id)}>
        Reset
        </button>
    </div>
    )
}

PlayerPreview.PropTypes={
  avatar:PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,

}
class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    var value =  event.target.value;
    this.setState(function(){
      return{
        username: value
      }
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
      );
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id:PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username',
}

class Battle extends React.Component{
  constructor(props){
    super(props);
    this.state={
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
    this.handleSummit = this.handleSummit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSummit(id,username){
    console.log('id',id,'username',username);
    this.setState({
      [id+'Name']:username,
      [id+'Image']:'https://github.com/'+username+'.png?size=200',
    });
    // this.setState(function(){
    //   var newState = {};
    //   newState[id + 'Name']= username;
    //   newState[id + 'Image'] = 'https://github.com/'+username+'.png?size=200';
    //   return newState;
    // });
  }

  handleReset(id){
    this.setState(function(){
      var newState = {};
      newState[id + 'Name']= '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render() {
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    return (
      <div>
      <div className="row">
        {!playerOneName && 
          <PlayerInput 
          id='playerOne'
          label='Player One'
          onSubmit={this.handleSummit} />}

        {playerOneImage!==null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}
            onReset={this.handleReset}
            id='playerOne'/>}

        {!playerTwoName && 
          <PlayerInput 
          id='playerTwo'
          label='Player Two'
          onSubmit={this.handleSummit} />}



        {playerTwoImage!==null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}
            onReset={this.handleReset}
            id='playerTwo'/>}
      </div>
      </div>
    )
  }

}
module.exports = Battle;