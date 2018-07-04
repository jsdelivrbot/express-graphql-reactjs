import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import {DELETE_MUTATION, DELETE_QUERY_NAME, FEED_QUERY, FEED_QUERY_NAME} from './Schema';
import { graphql } from 'react-apollo';

import BaseGrid from "../grid/BaseGrid";
import BaseTable from "../grid/BaseTable";
import BaseTableFilters from "../grid/BaseTableFilters";

class Grid extends BaseGrid {

    constructor(props){
        super(props);
        this.backURL = `users`;
        this.deleteQueryName = DELETE_QUERY_NAME;
        this.feedQueryName = FEED_QUERY_NAME;
    }

    render() {
        const filterOptions = {
            createButton : true,
            submitButton : true,
            filters : {
                createButton : true,
                search : {
                    name : 'search',
                    type  : 'text',
                    value : '',
                }
            }};
        const tableOptions = {
                'id' : {
                    sorted : true,
                    name : 'ID'
                },
                'email' : {
                    sorted : true,
                    name : 'Email'
                },
                'username' : {
                    sorted : true,
                    name : 'Username'
                },
                'create_date' : {
                    sorted : {
                        colname : 'created_at'
                    },
                    name : 'Date',
                },
                'actions' : {
                    keycol : 'id'
                }
            };

        return (

            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Users List
                </CardHeader>
                <CardBody>
                    <BaseTableFilters
                        url={this.backURL}
                        onFilter={this.onFilter}
                        options={filterOptions} />
                    <br/>
                    <BaseTable
                        options={tableOptions}
                        query={FEED_QUERY}
                        queryName={FEED_QUERY_NAME}
                        filters={this.state}
                        handleClickSortAction={this.handleClickSortAction}
                        handleChangePage={this.handleChangePage}
                        handleDeleteAction={this.handleDeleteAction}
                        handleEditAction={this.handleEditAction}
                    />
                </CardBody>
            </Card>
        )
    }
}

export default graphql(DELETE_MUTATION, {
    name: 'deleteMutation'
})(Grid);