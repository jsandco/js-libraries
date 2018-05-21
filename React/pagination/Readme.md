# Pagination

Pagination with Semantic UI React


## How to use it

	onPageSelect = page => this.setState({ page })

    <Pagination 
    		// number of the current page
    		page={page} 
    		// number of pages total
    		total_pages={pages} 
    		onPageClick={onPageSelect} 
    		increment={false} 
    	/>
