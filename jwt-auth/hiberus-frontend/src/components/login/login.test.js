import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import Login from './login';

describe('Test login component', () => {
    it('renders correctly', () => {
        const component = renderer.create(
            <MemoryRouter initialentries="{['/']}">
                <Login />
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});