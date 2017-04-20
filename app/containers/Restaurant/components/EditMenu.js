import React from 'react';
import { Link } from 'react-router';

class EditMenu extends React.PureComponent{
  constructor(props) {
    super(props);
  };

  render(){
    const { menu } = this.props.restaurant;
    return (
      <div>
        <h3>Menu</h3>
        <ul>
          {menu.map(dish =>
            (<li key={dish.id}><Link>{dish.name}</Link></li>)
          )}
        </ul>
      </div>
    );
  }
}

export default EditMenu;
