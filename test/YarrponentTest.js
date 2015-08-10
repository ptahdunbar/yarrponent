import expect from 'expect'
import React from 'react/addons'

const ReactTestUtils = React.addons.TestUtils
const shallowRenderer = ReactTestUtils.createRenderer()

describe('Yarrponent', function(){

    it('should have shallow rendering', () => {
        //let Yarrponent = require('../src/Yarrponent')
        let Yarrponent = React.createClass({
            render() {
                return (
                    <div>Web Component Starter Kit!</div>
                );
            }
        })

        shallowRenderer.render(<Yarrponent />)
        var result = shallowRenderer.getRenderOutput()

        expect(result.type).toBe('div')
    })
});
