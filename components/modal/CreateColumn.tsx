import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

export const columnTypes = [
  {
    id: 1,
    name: "Image",
  },
  {
    id: 2,
    name: "Text",
  },
  {
    id: 3,
    name: "Quantity",
  },
  {
    id: 4,
    name: "Amount",
  },
  {
    id: 5,
    name: "Status",
  },
];

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: {
    id: string; // Changed from number to string
    name: string;
  }) => void;
}

export default function AddStockModal({
  isOpen,
  onClose,
  onSave,
}: AddStockModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [columnTypeModalOpen, setColumnTypeModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [columnName, setColumnName] = useState("");
  const [selectedColumnType, setSelectedColumnType] = useState(columnTypes[0]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!columnName.trim()) newErrors.columnName = "Column Name is required.";
    return Object.keys(newErrors).length === 0;
  };

  const filteredColumnTypes = columnTypes.filter((columnType) =>
    columnType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFormValid = () => {
    return columnName && selectedColumnType;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!validateForm()) {
      setErrors(newErrors);
      return;
    }
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      setColumnName("");
      setSelectedColumnType(columnTypes[0]);
      onClose();
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleColumnTypeModal = () => {
    setColumnTypeModalOpen((prev) => !prev);
  };

  const handleColumnTypeSelect = (columnType: (typeof columnTypes)[0]) => {
    setSelectedColumnType(columnType);
    setColumnTypeModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setColumnTypeModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[720px] flex flex-col gap-[28px]">
        <div className="p-6 gap-5 flex flex-col">
          <div className="flex gap-2.5 items-center justify-between">
            <div className="flex p-2 gap-4 w-full items-center ">
              <div className="bg-[#CCEBDB] rounded-lg flex items-center justify-center">
                <Image
                  src="/modal-images/IconColumn.svg"
                  alt="add stock image"
                  className=""
                  width={48}
                  height={48}
                />
              </div>{" "}
              <h1 className="font-circular-medium text-[24px] text-left">
                Add New Column
              </h1>
            </div>

            <div className="hidden sm:block flex-shrink-0">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="flex  gap-5 flex-1 max-[640px]">
              <div className="flex flex-col gap-[8px] flex-1 ">
                <div className="flex border gap-[8px] rounded-[9px] m-1 relative h-[48px] md:h-[62px]">
                  <div
                    className="p-2 flex gap-[8px] items-center justify-between cursor-pointer w-full"
                    onClick={toggleColumnTypeModal}
                  >
                    <span className="text-[20px] text-center text-[#595959]">
                      {selectedColumnType.name}
                    </span>
                    <FaChevronDown className="w-[10px] h-[10px] text-[#888888]" />
                  </div>

                  {columnTypeModalOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 w-[298px] bg-white rounded-lg backdrop-blur-sm border shadow-lg z-10"
                    >
                      <div className="h-[200px] overflow-y-auto custom-scrollbar px-[20px] py-3 ">
                        {filteredColumnTypes.map((columnType) => (
                          <div
                            key={columnType.id}
                            className="flex items-center p-2 hover:bg-gray-100 w-full cursor-pointer"
                            onClick={() => handleColumnTypeSelect(columnType)}
                          >
                            <div>
                              <p className="text-[14px] font-circular-normal">
                                {columnType.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {errors.sellingPrice && (
                  <p className="text-[#FF1925] text-sm font-circular-normal">
                    {errors.sellingPrice}
                  </p>
                )}
              </div>
            </div>{" "}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="item-name"
                className="w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal bg-white"
                placeholder="Give this column a name"
                onChange={(e) => setColumnName(e.target.value)}
                required
              />
            </div>
            <div className="md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-4">
              <div className="flex flex-col-reverse md:flex-row justify-end gap-4 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-full md:w-auto px-[24px] py-[12px] rounded-[12px] border ${
                    isFormValid()
                      ? "bg-black text-white border-black"
                      : "bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]"
                  }`}
                  disabled={!isFormValid() || isLoading}
                >
                  <span className="md:hidden">Save</span>

                  <span className="hidden md:inline">
                    {isLoading ? "Creating..." : "Create Column"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
