"use client";

import Button from '@/app/components/button';
import { deleteTransaction } from '@/app/lib/actions';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function TransactionItemRemoveButton({ id, onRemoved }: { id: string; onRemoved?: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!id) {
      console.error("No transaction ID provided");
      return;
    }
    
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        setIsDeleting(true);
        await deleteTransaction(id);
        
        // Call the onRemoved callback after successful deletion
        if (onRemoved) {
          onRemoved();
        }
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button 
      onClick={handleDelete}
      disabled={isDeleting}
      variant="ghost"
      size="sm"
      className="text-gray-400 hover:text-red-500"
    >
      {isDeleting ? '...' : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
