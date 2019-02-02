import React,{Component} from 'react';

class HomeStore extends Component{
    render(){
        return (
            <ul>
                {
                    this.props.hots.map(item=>{
                        return (
                        <li key={item.store_id}>
                            <img src={item.store_avatarurl}/>
                            <p>{item.store_name}</p>
                            <span>{item.subtitle}</span>
                            <button>关注</button>
                        </li>

                        )
                    })
                }
            </ul>
        )
    }
}
export default HomeStore;