import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import MultiSelectDetail from './MultiSelectDetail.js';

class MultiSelection extends Component {
    render() {
        var vals = this.props.data.values;
        return (
            <div className={this.props.data.className +' '+this.props.data.questionName}>
                <Image src={this.props.data.imageUrl} responsive className="hp-image"/>
                <h3 className="question-text" dangerouslySetInnerHTML={{__html: this.props.data.description}}></h3>
                <div className="row">
                {
                    vals.map((item) => {
                      return <MultiSelectDetail
                              item={item}
                              key={item.key}
                              {...this.props}/>
                    })
                }
                </div>
            </div>
        )
    }
}

export default MultiSelection