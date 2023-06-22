import React from 'react';

function Header({ children, justify, gap }) {
	function createClassNameString() {
		let result = 'px-4 sticky top-0 h-16 bg-zinc-800 flex items-center';
		if (justify) result += ` ${justify}`;
		if (gap) result += ` ${gap}`;
		return result;
	}
	return <div className={createClassNameString()}>{children}</div>;
}

export default Header;
