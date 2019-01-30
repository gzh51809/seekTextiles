import React,{Component} from 'react';
import { CSSTransition } from "react-transition-group";
import 'animate.css';


function wrapAnimation(WrappedComponent) {
    return class extends Component {
        render() {
            console.log('高阶组件：',this.props)
            return (
                <CSSTransition
                    in={this.props.match !== null}
                    classNames={{
                        enter: 'animated',
                        enterActive: 'slideInRight',
                        exit: 'animated',
                        exitActive: 'slideOutLeft'
                    }}
                    timeout={1000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <WrappedComponent {...this.props} />
                </CSSTransition>
            )
        }
    }
}
export default wrapAnimation;