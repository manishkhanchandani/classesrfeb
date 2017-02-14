import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        console.log('ProductCategoryRow: ', this.props);
        return(
            <tr>
                <th colSpan="2">
                    {this.props.category}
                </th>
            </tr>
        );
    }
}

export default ProductCategoryRow