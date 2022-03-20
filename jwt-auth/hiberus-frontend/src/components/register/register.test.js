import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import Register from './register';

describe('Test Register component ', () => {
    it('renders correctly', () => {
        const component = renderer.create(
            <MemoryRouter initialentries="{['/']}">
                <Register />
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});