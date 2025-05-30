import PageHeader from "../components/page-header";
import TransactionItem from "../components/transaction-item";
import Trend from "../components/trend";
import TransactionSummaryItem from "../components/transaction-summary-item";
import Button from "../components/button";
import Label from "../components/label";
import Input from "../components/input";
import Seperator from "../components/seperator";
import Skeleton from "../components/skeleton";



export default function Page() {
  return (
    <>
    <main className="space-y-8">
      <h1 className="text-4xl mt-8 mb-44">Playground</h1>

      <div>
      <h2 className="mb-4 text-lg font-mono">Page Header</h2>
<Seperator/>       
      <div>
        <PageHeader />
      </div>
      </div>

      <div>
      <h2 className="mb-4 text-lg font-mono">Trend</h2>
<Seperator/>       
      <div className="flex space-x-4">
        <Trend type="Income" amount={1000} prevAmount={900} />
        <Trend type="Expense" amount={12000} prevAmount={10000} />
        <Trend type="Savings" amount={5000} prevAmount={6000} />
        <Trend type="Investment" amount={2000} prevAmount={2100} />
      </div>
      </div>
      <div>
      <h2 className="mb-4 text-lg font-mono">Transaction item</h2>
<Seperator/>       
      <div className="space-y-4">
        <TransactionItem types="Income" description="Salary" amount={2000} id="Income-1"/>
        <TransactionItem
        types="Expense"
        category="Food"
        description="Going out to eat"
        amount={29}
        id="Income-1"
        />
        <TransactionItem
        types="Saving"
        description="For Children"
        amount={500}
        id="Saving-1"
        />
        <TransactionItem
        types="Investment"
        description="In Microsoft"
        amount={9000}
        id="Investment-1"
        />
        {/* TransactionItem component can be added here */}
        {/* Example: <TransactionItem transaction={transactionData} /> */}
      </div>
      </div>

      <div>
      <h2 className="mb-4 text-lg font-mono">
        TransactionSummaryItem+TransactionItem
      </h2>
        <TransactionSummaryItem date="2023-10-01" amount={2000} />
        <TransactionItem types="Income" description="Salary" amount={2000} id="Income-2" />
        <TransactionItem
        types="Expense"
        category="Food"
        description="Going out to eat"
        amount={29}
        id="Expense-2"
        />
        <TransactionItem
        types="Saving"
        description="For Children"
        amount={500}
        id="Saving-2"
        />
        <TransactionItem
        types="Investment"
        description="In Microsoft"
        amount={9000}
        id="Investment-2"
        />
        {/* TransactionItem component can be added here */}
        {/* Example: <TransactionItem transaction={transactionData} /> */}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Seperator/>
        <div className = "flex space-x-4">
          <Button> Hello </Button>
          <Button variant="outline"> Hello </Button>
          <Button variant="ghost"> Hello </Button>
          <Button size="xs"> Hello </Button>
          <Button size="sm"> Hello </Button>
          <Button size="lg"> Hello </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Seperator/>       
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="mb-4">
              <div className="w-full">
                <label htmlFor="name" className="text-gray-700 dark:text-gray-300 block mb-1">
                  Your name
                </label>
                <Input
                  placeholder="Type something in here "
                  type="text"
                  className="w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="w-full"></div>
              <Label htmlFor="City" className="ml-2">
                City 
              </Label>
              <select className="w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950">
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
              </select>
            </div>
            <div className="flex items-center">
              <Input
                type="checkbox" className="ml-8"/>
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 block ml-2">
                Accept Terms and Conditions 
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Seperator/>
        <div className="grid grid-cols-1 gap-4">
          <Skeleton />
        </div>
        <div className="space-y-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </main>
    </>
  );
}
