import React,{Component} from 'react';

class HomeSpecials extends Component{
    render(){
        let {handleToPage} = this.props;
        return (
            <div className="home-specials">
                {
                    this.props.specials.map((items,idx)=>{
                        let name = '';
                        let type = items.templatetype;
                        switch(type){
                            case 2:
                                name = 'specials-half';
                                break;
                            case 5:
                                name = 'specials-trisection';
                                break;
                            default:
                                name = 'specials-full';
                        }
                        return (
                            <ul key={idx}>
                                {
                                    items.specialitems.map(item=><li className={name} key={item.imageurl} onClick={()=>handleToPage(item.href)}><img src={item.imageurl}/></li>)
                                }
                            </ul>
                        )
                    })
                }
            </div>
        )
    }
}
export default HomeSpecials;