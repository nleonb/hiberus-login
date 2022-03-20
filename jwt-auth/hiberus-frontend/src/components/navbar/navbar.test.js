import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

import Navbar from './navbar';

describe('Test Navbar component ', () => {
    it('renders correctly', () => {
        const component = renderer.create(
            <MemoryRouter initialentries="{['/']}">
                <Navbar />
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});