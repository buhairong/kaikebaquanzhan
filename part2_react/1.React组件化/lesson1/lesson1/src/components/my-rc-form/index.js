// 以下是作业内容： 西撒哈拉

import React, {Component} from "react";

class createForm extends Component {
    constructor(props) {
        this.options = {}
    }

    setFieldsValue = newStore => {
        this.setState(newStore)
    }

    getFieldsValue = () => {
        return this.state
    }

    validateFields = callback => {
        let err = []

        for(let field in this.options) {
            if(this.state[field] === undefined) {
                err.push({
                    [field]: "err"
                })
            }
        }

        if(err.length === 0) {
            callback(null, this.state)
        }else{
            callback(err, this.state)
        }
    }
}