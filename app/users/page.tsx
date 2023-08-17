import prisma from "../../lib/prisma";

import Table from "../../components/table/Table";
import React from "react";
import Link from "next/link";



export default async function  Users() {
  let users = await prisma.user.findMany();

  users = JSON.parse(JSON.stringify(users));

  const columns = [
      {
        accessorKey: "id",
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ renderedCellValue }) => {
          return renderedCellValue;
        },
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ cell, renderedCellValue }) => (
          <Link href={`/users/${encodeURIComponent(cell.getValue())}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "sold", //simple recommended way to define a column
        header: "Sales $",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "spent", //simple recommended way to define a column
        header: "Purchases $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "balance", //simple recommended way to define a column
        header: "Balance",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
    ];

  return (
    <>
      <Table viewName="user's list" columns={columns} data={users} />
    </>
  );
}
