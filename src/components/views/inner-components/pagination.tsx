import { FC, useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PaginationProps {
	itemsPerPage: number[],
	totalItems: number,
	startIndex: number,
	endIndex: number,
	onPageChange: (newPage: number, newItemsPerPage: number) => void
}

const Pagination: FC<PaginationProps> = ({ itemsPerPage, totalItems, onPageChange, startIndex, endIndex }: PaginationProps) => {
	const [itemsPerPageOption, setItemsPerPageOption] = useState(10);
	const totalPages = Math.ceil(totalItems / itemsPerPageOption);
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		onPageChange(newPage, itemsPerPageOption);
	}

	const handleItemsPerPageChange = (event: SelectChangeEvent) => {
		const newItemsPerPage = parseInt(event.target.value, 10);
		setItemsPerPageOption(newItemsPerPage);
	}

	useEffect(() => {
		onPageChange(currentPage, itemsPerPageOption);
	}, [currentPage, itemsPerPage, handleItemsPerPageChange]);

	return (
		<>
			<div className="items-per-page">
				<p>Items per page:</p>
				<div className="pagination-select">
					<FormControl>
						<Select
							sx={{ fontSize: "inherit", boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
							id="select"
							label={itemsPerPageOption}
							onChange={handleItemsPerPageChange}
							value={`${itemsPerPageOption}`}
						>
							{itemsPerPage.map((option, i) => (
								<MenuItem key={i} value={option}>{option}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
			<div className="page-nrs">
				<span>{startIndex} - {endIndex} of {totalItems}</span>
			</div>
			<div className="btn-group">
				<IconButton id="left" aria-label="go to previous page" size="large" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
					<NavigateNextIcon />
				</IconButton>
				<IconButton aria-label="go to next page" size="large" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
					<NavigateNextIcon className="right"/>
				</IconButton>
			</div>
		</>
	);
}
export default Pagination;