'use client'
import Debugger from '@/app/_components/Debugger'
import { useGetOrdersQuery } from '@/redux/api/order.api'
import React, { useRef } from 'react'

const EndPointTestPage = () => {
    const contentRef = useRef<HTMLPreElement>(null)
    const { data, error, isLoading } = useGetOrdersQuery("")

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>Endpoint Test Page</h1>
            <Debugger>
                <pre ref={contentRef}>
                    {JSON.stringify(data || error, null, 2)}
                </pre>
            </Debugger>
        </div>
    )
}

export default EndPointTestPage