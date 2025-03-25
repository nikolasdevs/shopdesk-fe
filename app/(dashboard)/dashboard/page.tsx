'use client';

import { getAccessToken } from "@/app/api/token";
import LoadingAnimation from "@/components/functional/loading";

import DeleteItem from "@/components/modal/delete-item";
import EditItemModal from "@/components/modal/edit-stock";
import LogoutConfirmModal from "@/components/modal/logoutConfirmationModal";

import { deleteStock, GetProduct, GetStock } from "@/services/stock";
import { useStore } from "@/store/useStore";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import useTableAreaHeight from "./hooks/useTableAreaHeight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TableContent from "./components/TableContent";
import Settings from "./components/Settings";

export type StockItem = {
  id: string;
  name: string;
  buying_price: number;
  quantity: number;
  currency_code: string;
  sku?: string;
  buying_date?: string;
  product_id?: string;
  status?: string;
  user_id?: string;
  date_created?: string;
  original_quantity?: number;
  supplier?: null | any;
  timeslots?: any[];
  image?: { id: string; src: string } | null;
  images?: { id: string; src: string }[];
};

export type ProductItem = {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: {};
  unavailable: false;
  // "unavailable_start": "2025-03-14T13:14:42.799Z"
  // "unavailable_end": "2025-03-14T13:14:42.799Z",
  status: string;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  categories: [];
  date_created: string;
  last_updated: string;
  user_id: string;
  current_price: string;
  is_deleted: boolean;
  available_quantity: number;
  selling_price: number;
  discounted_price: number;
  buying_price: number;
  photos: [];
  attributes: {};
};

const Page = () => {
  const { organizationId, organizationName, organizationInitial } = useStore();

  const { tableAreaRef, tableAreaHeight } = useTableAreaHeight();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //Active Tab
  const [activeTab, setActiveTab] = useState('stock');

  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isEditingTransition, setIsEditingTransition] = useState<string | null>(
    null
  );
  const [editedItem, setEditedItem] = useState<StockItem | null>(null);
  const [activeField, setActiveField] = useState<keyof StockItem | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const router = useRouter();

  const totalItems = stockItems.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedItems = stockItems.slice(
    startIndex,
    Math.min(startIndex + rowsPerPage, totalItems)
  );

  const emptyRowsCount = Math.max(0, rowsPerPage - displayedItems.length);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);

  const handleImageClick = (item: StockItem) => {
    setCurrentItem(item);
    setImageModalOpen(true);
  };

  const handleSaveImages = (images: { id: string; src: string }[]) => {
    if (!currentItem) return;

    const updatedItems = stockItems.map((item) => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          image: images.length > 0 ? images[0] : null,
          images: images,
        };
      }
      return item;
    });

    setStockItems(updatedItems);

    setImageModalOpen(false);
    setCurrentItem(null);
  };

  useEffect(() => {
    let isMounted = true; // Prevents state updates if component unmounts
    setIsLoading(true);

    const fetchProductsAndStocks = async () => {
      try {
        // Fetch products
        const productData: any = await GetProduct();
        if (!isMounted) return; // Prevent state update if unmounted
        setProductItems(productData.items);

        // Fetch stock for each product
        const stockData = await Promise.all(
          productData.items.map((product: any) => GetStock(product.id))
        );

        if (!isMounted) return;
        const formattedStockItems = stockData.flatMap((data, index) =>
          data.items.map((stock: any) => ({
            ...stock,
            sku: productData.items[index]?.unique_id,
          }))
        );

        setStockItems(formattedStockItems);
      } catch (error) {
        console.error('Error fetching products or stocks:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProductsAndStocks();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleEditClick = (item: StockItem) => {
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleSaveEdit = (updatedItem: StockItem) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    setSelectedItem({ ...updatedItem });
    setOpenEdit(false);
  };

  const handleDeleteClick = (item: StockItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
    setSelectedItem(null);
  };

  const closeAddModal = () => {
    setOpenAdd(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteStock(itemId);
      setIsDeleteModalOpen(false);
      setStockItems((prev) =>
        prev.filter((item) => item.product_id !== itemId)
      );
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (count: number) => {
    setRowsPerPage(count);
    setCurrentPage(1);
  };

  const handleInlineEdit = useCallback(
    (item: StockItem, field: keyof StockItem = 'name') => {
      setIsEditingTransition(item.id);
      setEditedItem({ ...item });
      setActiveField(field);
      setIsEditingTransition(null);
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof StockItem, value: string) => {
      console.log("Input changed:", field, value);
      if (editedItem) {
        setEditedItem((prev) => ({
          ...prev!,
          [field]:
            field === 'quantity' || field === 'buying_price'
              ? Number(value)
              : value,
        }));
        setActiveField(field);
      }
    },
    [editedItem]
  );

  const handleInlineEdit = useCallback(
    (item: StockItem, field: keyof StockItem = "name") => {
      console.log("Inline edit started:", item.id, field);
      setIsEditingTransition(item.id);
      setEditedItem({ ...item });
      setActiveField(field);
      setIsEditingTransition(null);
    },
    []
  );

  const cancelEdit = useCallback(() => {
    setEditedItem(null);
    setActiveField(null);
  }, []);

  const handleSaveInline = async () => {
    if (!editedItem) return;

    console.log("Saving inline edit:", editedItem);

    const organization_id = organizationId;
    try {
      const token = await getAccessToken();
      setIsEditingTransition(editedItem.id);

      const response = await fetch('/api/stocks/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organization_id: organization_id,
          stock_id: editedItem.id,
          name: editedItem.name,
          buying_price: editedItem.buying_price,
          quantity: editedItem.quantity,
          currency_code: editedItem.currency_code,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock item');
      }

      setStockItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editedItem.id ? { ...item, ...editedItem } : item
        )
      );

      setEditedItem(null);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsEditingTransition(null);
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  useEffect(() => {
    if (organizationId === '160db8736a9d47989381e01a987e4413') {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  }, [])

  const handleBackToStock = () => {
    setShowSettings(false);
  };

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh ">
      <div ref={tableAreaRef} className="space-y-8 w-full h-full ">
      <LogoutConfirmModal
         organizationName={organizationName}
         open={isMobileLogoutModalOpen || isDesktopLogoutModalOpen}
         onOpenChange={(open) => {
           if (!open) {
             setIsMobileLogoutModalOpen(false);
             setIsDesktopLogoutModalOpen(false);
           }
         }}
         onCancel={() => {
           setIsMobileLogoutModalOpen(false);
           setIsDesktopLogoutModalOpen(false);
         }}
       />

        <DeleteItem
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteItem}
          selectedItem={
            selectedItem
              ? { product_id: selectedItem.product_id ?? '' }
              : undefined
          }
        />
        <div className='lg:border px-4 py-2 lg:shadow-md rounded-lg lg:flex items-center justify-between mx-auto'>
          <div className='flex items-center gap-6'>
            <div className='flex justify-center lg:justify-start w-full lg:w-auto'>
              <Logo />
            </div>
            <small className='text-black text-left hidden lg:block'>
              The simplest way to manage your shop!
            </small>
          </div>
          <div className=''>
            <DropdownMenu modal>
              <DropdownMenuTrigger
                disabled
                className='btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white'
              >
                <span className='py-2 px-4 rounded-lg bg-white text-black'>
                  {organizationInitial}
                </span>
                {organizationName}
                <ChevronDown strokeWidth={1.5} color='white' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className='w-full px-[5rem]'
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='space-y-0 w-full '>
          <div className='w-full flex justify-between max-[800px]:flex-col-reverse'>
            <div>
              <div className='flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[800px]:w-full font-semibold px-9 shadow-inner'>
                Stock
                <Image
                  src='/icons/ui-box.svg'
                  alt=''
                  width={20}
                  height={20}
                  className='w-5 h-5'
                />
              </div>

              {/*<SalesTab
               // onAddSale={() => {
                //  console.log("Add sale action triggered");
                 // console.log("Active tab:", activeTab);
                //}}
             // /> */}
            </div>
            {stockItems.length > 0 && (
              <div className='mb-2 max-[800px]:mb-4 max-[640px]:self-end flex items-center justify-center max-[1000px]:flex-row-reverse max-[800px]:w-full'>
                <div className='relative group inline-block'>
                  {/* Tooltip */}
                  {!isPremium && stockItems.length >= 10 && (
                    <div className='z-50 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity'>
                      Upgrade to Premium to add more.
                      <a
                        href='/pricing'
                        className='text-blue-400 underline ml-1 '
                      >
                        Upgrade now
                      </a>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    onClick={openModal}
                    className='btn-primary max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50'
                    disabled={!isPremium && stockItems.length >= 10}
                  >
                    + Add New
                  </button>
                </div>
                <button
                  onClick={openModal}
                  className='btn-primary max-[400px]:text-sm text-nowrap min-[1000px]:hidden ml-2'
                >
                  +
                </button>

                <div className='relative max-[800px]:w-full'>
                  <input
                    type='text'
                    className='h-12 border w-[327px] max-[800px]:w-full rounded-md focus:outline-2 focus:outline-[#009A49] px-10'
                    onChange={(event) => {
                      setIsSearching(true);
                      setSearchText(event.target.value);
                      if (!event.target.value) {
                        setIsSearching(false);
                      }
                    }}
                  />

                  <Search className='text-[#667085] absolute top-3 left-3 ' />
                </div>

                <div className='z-10'>
                  <AddItemModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    onSave={(newItem) => {
                      setStockItems((prev) => [newItem, ...prev]); // Inserts new items at the top

                      closeModal();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex w-full overflow-hidden mx-auto'>
            <div
              className={`border shadow-md rounded-b-lg rounded-bl-lg relative rounded-tr-lg flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'w-full max-w-[989px] mr-1' : 'w-full'
              }`}
            >
              {stockItems.length === 0 ||
              (isSearching && filteredItems.length === 0) ? (
                <div className='relative w-full'>
                  <Table className='bg-white border-0 border-collapse w-full'>
                    <TableHeader>
                      <TableHeader>
                        <TableRow className='h-[50px] '>
                          <TableHead className='text-[#090F1C] font-circular-medium text-left border-b border-r'>
                            ITEM NAME
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r px-4'>
                            SELLING PRICE
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r px-4'>
                            AVAILABLE
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b border-r '>
                            SHOW SALES
                          </TableHead>
                          <TableHead className='text-[#090F1C] font-circular-medium text-center border-b '>
                            SHOW PROFIT
                          </TableHead>
                          <TableHead className=''>
                            <Plus className='w-[16px] h-[16px] self-center' />
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                    </TableHeader>
                  </Table>
                  <div className='w-full overflow-x-auto'>
                    <span className='w-full h-px bg-[#DEDEDE] block'></span>
                    <div className='relative h-[80vh] w-full'>
                      {!(isSearching && filteredItems.length === 0) ? (
                        <div className='absolute space-y-4 right-0 left-0 top-28 w-56 mx-auto text-center'>
                          <Image
                            src='/icons/empty-note-pad.svg'
                            alt=''
                            width={56}
                            height={56}
                            className='mx-auto'
                          />
                          <p className='text-[#888888] text-sm'>
                            You have 0 items in stock
                          </p>
                          <button
                            type='button'
                            onClick={openModal}
                            className='btn-outline hover:cursor-pointer'
                          >
                            + Add New Stock
                          </button>
                          <AddItemModal
                            isOpen={isOpen}
                            onClose={closeModal}
                            onSave={(newItem) => {
                              setStockItems((prev) => [newItem, ...prev]);
                              closeModal();
                            }}
                          />
                        </div>
                      ) : (
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='bg-[#F8FAFB] border border-[#DEDEDE] w-[563px] h-[200px] rounded-lg flex flex-col items-center justify-center gap-3 max-[800px]:w-[343px] max-[800px]:h-[334px]'>
                            <Image
                              src={box}
                              alt=''
                              width={56}
                              height={56}
                              className='size-8'
                            />
                            <p className='text-[#2A2A2A] text-sm'>
                              Search Item not found.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <Table
                    style={{ minWidth: '800px', borderCollapse: 'collapse' }}
                  >
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className='h-[50px]'>
                          {headerGroup.headers.map((header) => {
                            let widthClass = 'w-auto'; // Default width of the header columns

                            if (header.column.id === 'name') {
                              widthClass =
                                showSales && showProfit
                                  ? 'max-w-[259px]'
                                  : showSales
                                    ? 'max-w-[292px]'
                                    : showProfit
                                      ? 'max-w-[292px]'
                                      : 'max-w-[374px] pl-4';
                            } else if (header.column.id === 'sell_price') {
                              widthClass =
                                showSales && showProfit
                                  ? 'w-auto px-4'
                                  : showSales || showProfit
                                    ? 'w-[262px]'
                                    : 'w-[280px]';
                            } else if (header.column.id === 'available') {
                              widthClass =
                                showSales && showProfit
                                  ? 'w-auto px-4'
                                  : showSales || showProfit
                                    ? 'w-[206px]'
                                    : 'w-[198px]';
                            } else if (header.column.id === 'sales') {
                              widthClass = showSales ? 'w-[30px]' : 'w-auto ';
                            } else if (header.column.id === 'profitGroup') {
                              widthClass = showProfit ? 'w-[350px]' : 'w-auto ';
                            }

                            return (
                              <TableHead
                                key={header.id}
                                className={`text-[#090F1C] font-circular-medium text-center border-b border-r min-w-[100px] 
    ${
      (showSales && !['name', 'sales', 'actions'].includes(header.id)) ||
      (showProfit && !['name', 'profitGroup', 'actions'].includes(header.id))
        ? 'hidden sm:table-cell'
        : ''
    } ${widthClass}`}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: rowsPerPage }).map((_, index) => {
                        const row = table.getRowModel().rows[index] || null;
                        return (
                          <TableRow
                            key={index}
                            className='h-[50px] cursor-pointer'
                            onClick={() => row && handleRowClick(row.original)}
                          >
                            {row
                              ? row.getVisibleCells().map((cell) => {
                                  let cellWidthClass = 'w-auto'; // Default width

                                  if (cell.column.id === 'name') {
                                    cellWidthClass =
                                      showSales && showProfit
                                        ? 'w-[259px]'
                                        : showSales
                                          ? 'w-[292px]'
                                          : showProfit
                                            ? 'w-[292px]'
                                            : 'w-[374px]';
                                  } else if (
                                    cell.column.id === 'price' ||
                                    cell.column.id === 'available'
                                  ) {
                                    cellWidthClass =
                                      showSales && showProfit
                                        ? 'w-auto px-4'
                                        : showSales || showProfit
                                          ? 'w-[262px]'
                                          : 'w-[280px]';
                                  } else if (cell.column.id === 'sales') {
                                    cellWidthClass = showSales
                                      ? 'w-[356px]'
                                      : 'w-auto px-3';
                                  } else if (cell.column.id === 'profit') {
                                    cellWidthClass = showProfit
                                      ? 'w-[362px]'
                                      : 'w-auto px-3';
                                  }

                                  return (
                                    <TableCell
                                      key={cell.id}
                                      className={`p-0 py-0 align-middle h-[50px] text-center border-r ${
                                        (
                                          showSales &&
                                            ![
                                              'name',
                                              'sales',
                                              'actions',
                                            ].includes(cell.column.id)
                                        ) ||
                                        (
                                          showProfit &&
                                            ![
                                              'name',
                                              'profitGroup',
                                              'actions',
                                            ].includes(cell.column.id)
                                        )
                                          ? 'hidden sm:table-cell'
                                          : ''
                                      } ${cellWidthClass}`}
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </TableCell>
                                  );
                                })
                              : columns.map((column) => (
                                  <TableCell
                                    key={column.id}
                                    className='text-center border-r text-gray-400'
                                  >
                                    {''} {/* Placeholder for missing row */}
                                  </TableCell>
                                ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={columns.length} className=''>
                          <PaginationFeature
                            totalItems={
                              isSearching
                                ? filteredItems.length
                                : stockItems.length
                            }
                            currentPage={currentPage}
                            itemsPerPage={rowsPerPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <Sidebar
                key={
                  selectedItem?.id + '-' + (selectedItem?.images?.length || 0)
                }
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                selectedItem={selectedItem}
                onSave={handleSaveEdit}
              />
            )}
            {/*Image Upload Modal */}
            {imageModalOpen && (
              <ImageUploader
                itemName={currentItem?.name || ''}
                existingImages={currentItem?.images || []}
                onSave={handleSaveImages}
                onCancel={() => setImageModalOpen(false)}
                isOpen={imageModalOpen}
              />
            )}
          </div>
          <Settings />
        </div>
      ) : (
        <TableContent
          stockItems={stockItems}
          setStockItems={setStockItems}
          handleInputChange={handleInputChange}
          handleInlineEdit={handleInlineEdit}
          handleSaveInline={handleSaveInline}
          editedItem={editedItem}
          isEditingTransition={isEditingTransition}
          activeField={activeField}
          cancelEdit={cancelEdit}
        />
      )}

      <EditItemModal
        isOpen={openEdit}
        onClose={closeEditModal}
        item={selectedItem!}
        onSave={handleSaveEdit}
      />

      <div className='flex flex-col gap-2 mt-4'>
        <p className='text-center mt-4'>
          © {new Date().getFullYear()}, Powered by Timbu Business
        </p>
      </div>
    </main>
  );
};

export default Page;
