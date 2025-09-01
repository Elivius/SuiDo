import { Loader2 } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

interface LoadingPopupProps {
  message: string;
  isVisible: boolean;
}

export function LoadingPopup({ message, isVisible }: LoadingPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-6 py-4 bg-gray-900/95 text-white rounded-2xl shadow-xl ring-2 ring-cyan-400"
          >
            <Loader2 className="animate-spin w-6 h-6 text-cyan-400" />
            <p className="text-base font-medium">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}