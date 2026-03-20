import { SearchBar } from "../atoms/SearchBar";

export const SidebarSearch = ({
  onSearch
}: {
  onSearch?: (term: string) => void;
}) => {
  return (
    <div className="mb-8">
      <SearchBar onSearch={onSearch} placeholder="Tìm kiếm ..." />
    </div>
  );
};
