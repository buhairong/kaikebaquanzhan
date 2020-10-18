import React from 'react'

export const navRef = React.createRef()

export function navigate(routeName, params) {
    return navRef.current.navigate(routeName, params)
}

export function goBack() {
    return navRef.current.goBack()
}