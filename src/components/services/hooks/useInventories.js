import { useState, useEffect } from "react";
import handleDeleteInventory from "../handleDeleteInventory.js";
import getInventories from "../getInventories.js";
import getUserInventories from "../getUserInventories.js";
import getAllPublicInventories from "../getAllPublicInventories.js";
import getAccessWriteInventories from "../getAccessWriteInventories.js";
export const useInventories = () => {
  const [inventories, setInventories] = useState([]);
  const [userInventories, setUserInventories] = useState([]);
  const [allPublicInventories, setAllPublicInventories] = useState([]);
  const [allWriteAccessInventories, setAllWriteAccessInventories] = useState(
    [],
  );
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getInventories();
      setInventories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getUserInventories();
      setUserInventories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSelected = async () => {
    setIsLoading(true);
    try {
      await handleDeleteInventory(selectedIds);
      //userInventories.filter((row) => !selectedIds.includes(row.id))
      setSelectedIds([]);
      setMessage("Inventory deleted!");
      await fetchUserInventories();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPublickInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPublicInventories();
      setAllPublicInventories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllWriteAccessInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getAccessWriteInventories();
      setAllWriteAccessInventories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchInventories();
    fetchUserInventories();
    fetchAllPublickInventories();
    fetchAllWriteAccessInventories();
  }, []);

  return {
    inventories,
    setInventories,
    userInventories,
    setUserInventories,
    selectedIds,
    setSelectedIds,
    isLoading,
    setIsLoading,
    error,
    message,
    setError,
    setMessage,
    deleteSelected,
    allPublicInventories,
    setAllPublicInventories,
    allWriteAccessInventories,
    setAllWriteAccessInventories,
  };
};
