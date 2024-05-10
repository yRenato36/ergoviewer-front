import { useState } from "react";

export function useProjectFilter(initialFilter) {
  const [filter, setFilter] = useState(initialFilter);

  const handleInputChange = (columnName, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [columnName]: value,
    }));
  };

  const handleInputValueChange = (columnName) => (e) => {
    const { value } = e.target;
    handleInputChange(columnName, value);
  };

  const filterProjects = (projects) => {
    return projects.filter((p) => {
      return (
        (filter.author === "" ||
          p.author.toLowerCase().includes(filter.author.toLowerCase())) &&
        (filter.name === "" ||
          p.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (filter.created_at === "" ||
          p.created_at.includes(filter.created_at)) &&
        (filter.social_reason === "" ||
          p.social_reason
            .toLowerCase()
            .includes(filter.social_reason.toLowerCase())) &&
        (filter.cnpj === "" || p.cnpj.includes(filter.cnpj)) &&
        (filter.active === "" || p.active.toString() === filter.active)
      );
    });
  };

  return {
    filter,
    setFilter,
    handleInputChange,
    handleInputValueChange,
    filterProjects,
  };
}
