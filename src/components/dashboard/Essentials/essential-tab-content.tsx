"use client";
import React, { useState } from "react";

import QueryComponent from "@/components/queryComponent";
import { Button, Chip, Divider, Spacer } from "@nextui-org/react";
import AddModal from "@/components/CurdTable/add-model";
import UserDeleteModal from "@/components/CurdTable/delete";
import CommonTable from "@/components/CurdTable/common-table";
import { motion } from "framer-motion";

import DetailsModal from "@/components/CurdTable/details";
import EditModal from "@/components/CurdTable/edit-model";
import {
  apiRoutesByRole,
  generateColumns,
  initialTableConfig,
} from "@/utlis/tableValues";
import { SubTitle, SubTitleSecond } from "@/components/titles";
import { getData } from "@/backend/Services/firestore";
import { useQuery } from "@tanstack/react-query";
import { query } from "firebase/firestore";
import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";

const buyerRules = [
  {
    id: "ss",
    activity: "Shares clear inquiry (size, qty, location)",
    points: "+1",
    notes: "Clear & actionable",
  },
  {
    id: "Responds to at least 3 quotes",
    activity: "Responds to at least 3 quotes",
    points: "+1",
    notes: "Promotes dialogue",
  },
  {
    id: "Places confirmed order",
    activity: "Places confirmed order",
    points: "+3",
    notes: "Verified by supplier",
  },
  {
    id: "Pays on time",
    activity: "Pays on time",
    points: "+4",
    notes: "Verified transaction",
  },
  {
    id: "Gives feedback after deal",
    activity: "Gives feedback after deal",
    points: "+1",
    notes: "Verified rating",
  },
  {
    id: "Cancels confirmed order",
    activity: "Cancels confirmed order",
    points: "-4",
    notes: "Unless justified",
  },
  {
    id: "Fails to respond after inquiry",
    activity: "Fails to respond after inquiry",
    points: "-2",
    notes: "Ghosting behavior",
  },
  {
    id: "Changes deal price after commitment",
    activity: "Changes deal price after commitment",
    points: "-5",
    notes: "Strong penalty",
  },
  {
    id: "Repeated unrealistic demands",
    activity: "Repeated unrealistic demands",
    points: "-3",
    notes: "Admin discretion",
  },
  {
    id: "Shares realistic target price (matches market)",
    activity: "Shares realistic target price (matches market)",
    points: "+1",
    notes: "Acceptable baseline",
  },
  {
    id: "Shares realistic target price (matches market)",
    activity: "Shares realistic target price (matches market)",
    points: "+1",
    notes: "Acceptable baseline",
  },
  {
    id: "Shares flexible range (e.g., ₹61–63/kg)",
    activity: "Shares flexible range (e.g., ₹61–63/kg)",
    points: "+1.5",
    notes: "Encouraged",
  },
  {
    id: "Quotes unrealistically low price",
    activity: "Quotes unrealistically low price",
    points: "-4",
    notes: "Wastes time",
  },
  {
    id: "Changes price after agreement",
    activity: "Changes price after agreement",
    points: "-5",
    notes: "Strong penalty",
  },
];
const supplierRules = [
  {
    id: "Replies to inquiry within 6 hrs",
    activity: "Replies to inquiry within 6 hrs",
    points: "+1",
    notes: "Once/day cap",
  },
  {
    id: "Replies within 24 hrs",
    activity: "Replies within 24 hrs",
    points: "+0.5",
    notes: "Response must be meaningful",
  },
  {
    id: "Shares full spec & clear images/video",
    activity: "Shares full spec & clear images/video",
    points: "+1",
    notes: "Verified, real photo",
  },
  {
    id: "Pays on time",
    activity: "Pays on time",
    points: "+4",
    notes: "Verified transaction",
  },
  {
    id: "Successfully completes a deal",
    activity: "Successfully completes a deal",
    points: "+3",
    notes: "Must be confirmed",
  },
  {
    id: "Delivers on time with correct specs",
    activity: "Delivers on time with correct specs",
    points: "+4",
    notes: "Verified by buyer",
  },
  {
    id: "Receives positive feedback (per 2)",
    activity: "Receives positive feedback (per 2)",
    points: "+2",
    notes: "2 reviews = 2 points",
  },
  {
    id: "No reply to inquiry",
    activity: "No reply to inquiry",
    points: "-2",
    notes: "Per ignored inquiry",
  },
  {
    id: "Late delivery or poor quality",
    activity: "Late delivery or poor quality",
    points: "-4",
    notes: "After validation",
  },
  {
    id: "Makes false claims / fake stock",
    activity: "Makes false claims / fake stock",
    points: "-7",
    notes: "Strong penalty",
  },
  {
    id: "Complaint from buyer",
    activity: "Complaint from buyer",
    points: "-3",
    notes: "After investigation",
  },
  {
    id: "Quotes significantly below market (suspicious)",
    activity: "Quotes significantly below market (suspicious)",
    points: "-3",
    notes: "May trigger review",
  },
  {
    id: "Quotes fairly below market (competitive)",
    activity: "Quotes fairly below market (competitive)",
    points: "+1",
    notes: "Verified, valid stock",
  },
  {
    id: "Quotes significantly above market",
    activity: "Quotes significantly above market",
    points: "-2",
    notes: "Non-competitive pricing",
  },
];

const EssentialTabContent = ({
  essentialName,
  showActions,
  associate,
}: {
  associate?: string;
  essentialName: string;
  showActions: boolean;
}) => {
  const tableConfig = { ...initialTableConfig }; // Create a copy to avoid mutations
  const queryKey = "associates";
  const [Commission, setCommission] = useState(50);
  // Generate columns
  let columns = generateColumns(essentialName, tableConfig);

  // Ensure columns is iterable and properly structured
  columns = Array.isArray(columns) ? columns : Object.values(columns);
  columns = columns.filter((column: any) => column && column.uid); // Ensure no invalid columns

  // Filter out 'action' column if showActions is false
  const newColumns = columns;

  console.log("Final columns (post-filter):", newColumns);

  const refetchData = () => {
    // Implement refetch logic if necessary
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[95%]">
        <div className="">
          <>
            <SubTitle title="GAIN Prestige Points System (GPPS)" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ y: -50, opacity: 0 }}

              transition={{ ease: "easeInOut" }}
              className="w-[95%] font-extralight"
            >
              <Spacer y={5} />
              <b> 🎯 Core Philosophy:</b> <Spacer y={1} />
              <ul>
                <li>
                  Points are valuable. They must reflect genuine contribution,
                  trustworthiness, and professionalism.
                </li>

                <li>
                  Points are earned slowly, lost quickly. This builds a credible
                  network.
                </li>
              </ul>
              <Spacer y={5} />
              Empower your trading decisions with accurate and timely market
              insights, all consolidated in one reliable source.
            </motion.div>{" "}
            <Spacer y={4} />
            <SubTitle title="SUPPLIER Points System" />
          </>
          <Divider className="my-2 text-white bg-white" />
          <>
            <SubTitleSecond title="To filter out potential and genuine suppliers" />
            <Spacer y={5} />
            <CommonTable
              TableData={supplierRules}
              columns={newColumns} // Use the filtered array of columns
              isLoading={false}
            />
          </>
          <Spacer y={10} />
          <SubTitle title="Buyer Points System" />
          <Divider className="my-2 text-white bg-white" />
          <SubTitleSecond title="To filter out potential and genuine enquires" />
          <Spacer y={5} />
          <CommonTable
            TableData={buyerRules}
            columns={newColumns} // Use the filtered array of columns
            isLoading={false}
          />{" "}
        </div>
      </div>
      <Spacer y={5} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // exit={{ y: -50, opacity: 0 }}

        transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        className="w-[95%] font-extralight"
      >
        {" "}
        <p>If you have any doubts</p>
        <Spacer y={2} />
        <Link
          href={`http://wa.me/+919019351483`}
          target="_blank"
          className="z-10"
        >
          <Button color="success" variant="ghost" size="sm">
            Contact Team Via <RiWhatsappFill />
          </Button>
        </Link>{" "}
      </motion.div>
      <Spacer y={20} />
    </div>
  );
};

export default EssentialTabContent;
