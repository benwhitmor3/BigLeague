import React from 'react';


class Draft extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="dropdown" style = {{background:"white",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Prospects by Year </div>

          { this.state.displayMenu ? (
          <ul>
         <li><a href="#1">Year 1</a></li>
         <li><a href="#2">Year 2</a></li>
         <li><a href="#3">Year 3</a></li>
         <li><a href="#4">Year 4</a></li>
         <li><a href="#5">Year 5</a></li>
          </ul>
        ):
        (
          null
        )
        }
        <p> Does this move? yes it does </p>


       </div>


    );
  }
}

export default Draft;