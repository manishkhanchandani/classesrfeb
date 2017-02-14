import React from 'react';
import ProductCategoryRow from './ProductCategoryRow.js';
import ProductRow from './ProductRow.js';

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;

        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || 
            (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            console.log('product is ', product);
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }

            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        console.log('ProductTable: ', this.props);
        return(
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default ProductTable