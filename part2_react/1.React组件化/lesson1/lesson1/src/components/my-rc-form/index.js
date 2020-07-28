import React, {Component} from "react";

export default function createForm(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.options = {}
        }

        handleChange = (e) => {
            const {name, value} = e.target
            this.setState({
                [name]: value
            })
            console.log('change', this.state);
        }

        getFieldDecorator = (field, option) => InputCmp => {
            this.options[field] = option
            return React.cloneElement(InputCmp, {
                name: field,
                value: this.state[field] || '',
                onChange: this.handleChange
            })
        }

        setFieldsValue = newStore => {
            this.setState(newStore)
        }

        getFieldsValue = () => {
            return this.state
        }

        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldsValue: this.setFieldsValue,
                    getFieldsValue: this.getFieldsValue,
                    validateFields: this.validateFields
                }
            }
        }

        // 以下是作业内容： 西撒哈拉
        validateFields = callback => {
            let err = {}
    
            for(let field in this.options) {
                err[field] = []
                let fieldRules = this.options[field].rules
                console.log('fieldRules',fieldRules)
                for(let rule=0; rule<fieldRules.length; rule++) {
                    if(fieldRules[rule].required && !this.state[field]) {
                        err[field].push(fieldRules[rule].message)
                    }
                }
            }
    
            if(err.length === 0) {
                callback(null, this.state)
            }else{
                callback(err, this.state)
            }
        }

        render() {
            return <Cmp {...this.props} {...this.getForm()} />
        }        
    }
}