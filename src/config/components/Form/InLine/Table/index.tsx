import { ColumnDef, flexRender, TableOptions, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { getAppFields } from '../../../../../common/modules'
import Loading from '../Loading'

type TableData = {
  toCode: Element
  thisCode: Element
}

type ResultTableData = {
  toCode: string
  thisCode: string
}

const columns: ColumnDef<any>[] = [
  { header: 'データベースアプリ', accessorKey: 'toCode' },
  { header: 'コールアプリ', accessorKey: 'thisCode' },
]

function TableRow() {}

const DEFAULT_ROW = {
  toCode: '',
  thisCode: '',
}

function Table(data: TableOptions<any>) {
  const table = useReactTable(data)
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
