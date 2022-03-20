import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import Dashboard from './dashboard';

describe('Test Dashboard component ', () => {
    it('renders correctly', () => {
        const component = renderer.create(
            <MemoryRouter initialentries="{['/']}">
                <Dashboard />
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});