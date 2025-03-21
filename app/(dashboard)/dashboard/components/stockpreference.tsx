import { Button } from "@/components/ui/button";

function StockPreference() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1307px]">
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 border-b border-[#e9eaeb] pb-6">
        <div className="flex flex-col gap-1 text-[#181d27]">
          <p className="text-xl font-circular-medium leading-7">
            Stock Preference
          </p>
          <p className="text-[#535862] font-circular-light leading-5 text-base">
            Customize your store settings to optimize your business operations.
          </p>
        </div>
        <div className="flex flex-row gap-3 self-end md:self-auto">
          <Button variant="outline" className="px-6 py-3 text-base cursor-pointer">
            Cancel
          </Button>
          <Button className="px-6 py-3 text-base cursor-pointer">
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[64px] w-full">
        <div className="left-side flex flex-col gap-8 w-full max-w-[590px]">
          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full h-[249px] gap-16">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[450]">
                Currency Selection
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <select className="w-full max-w-[358px] h-[68px] border border-[#e9eaeb] rounded-lg px-4 py-3 font-circular-light text-[#535862] text-base leading-5 font-[450]">
                <option value="NGN" selected>NGN</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
                <option value="CNY">CNY</option>
              </select>
              <p className="font-circular-light text-[#535862] text-xs leading-5 font-[300] max-w-[358px]">
                Changing the store currency will update how prices are displayed but will not automatically convert existing product prices. Ensure you update your pricing accordingly.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[114px] justify-between">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[450]">
                Payment Options
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-col gap-3 ml-16">
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer accent-[#009A49]"
                  />
                  <label
                    htmlFor="checkbox1"
                    className="font-circular-light text-[#535862] text-base leading-5 font-[300]"
                  >
                    Bank Transfer
                  </label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer accent-[#009A49]"
                  />
                  <label
                    htmlFor="checkbox2"
                    className="font-circular-light text-[#535862] text-base leading-5 font-[300]"
                  >
                    PayPal
                  </label>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    id="checkbox3"
                    className="w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer accent-[#009A49]"
                  />
                  <label
                    htmlFor="checkbox3"
                    className="font-circular-light text-[#535862] text-base leading-5 font-[400]"
                  >
                    Stripe
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[68px] justify-between pb-4">
            <div className="flex flex-col justify-start w-[30%] min-w-[120px]">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[400]">
                Account Details
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <input
                type="text"
                className="w-full max-w-[328px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 ml-16 font-circular-light text-[#535862] text-base leading-5 font-[400]"
              />
            </div>
          </div>
        </div>

        <div className="right-side flex flex-col gap-5 w-full max-w-[653px] mt-8 lg:mt-0">
          <div className="flex flex-col gap-5 w-full max-w-[653px] h-[249px]">
            <div className="flex flex-row items-center justify-between gap-5">
              <p className="font-circular-medium text-[#414651] text-base leading-5 font-[400]">
                Tax Settings
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#009A49] transition-colors mr-77"></div>
                <span className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform"></span>
              </label>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Tax Percentage (%)
                </p>
                <input
                  type="number"
                  className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[300]">
                  Tax Type
                </p>
                <select className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  <option value="VAT" selected>VAT</option>
                  <option value="GST">GST</option>
                  <option value="Sales Tax">Sales Tax</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full max-w-[651px] h-[393px]">
            <p className="font-circular-medium text-[#A0A0A0] not-last text-lg leading-6 font-[400] text-[16px]">
              Inventory Management
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center justify-between border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Low Stock Alerts
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#009A49] transition-colors mr-77"></div>
                  <span className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform"></span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Low Stock Threshold
                </p>
                <input
                  type="number"
                  className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]"
                  placeholder="10"
                />
              </div>
              <div className="flex flex-row items-center justify-between border-b pb-4">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Auto-Restock
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#009A49] transition-colors mr-77"></div>
                  <span className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform"></span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  Restock Frequency
                </p>
                <select className="w-full sm:w-[352px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]">
                  <option value="daily" selected>Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockPreference;
