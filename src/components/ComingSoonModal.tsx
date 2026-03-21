import { Rocket } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function ComingSoonModal({ isOpen, onClose, featureName }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
          <Rocket className="w-10 h-10 text-blue-600" />
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Coming Soon!
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-gray-600 mt-2">
          {featureName ? (
            <>{featureName} is coming soon in the next update</>
          ) : (
            <>This feature is coming soon in the next update</>
          )}
          <span className="inline-block ml-1">🚀</span>
        </p>
        
        <p className="text-sm text-gray-500 mt-4">
          We're working hard to bring you the best experience. Stay tuned!
        </p>
        
        <Button onClick={onClose} className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
