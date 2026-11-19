import React from 'react';
import { X } from 'lucide-react';

interface CareerGoalModalProps {
  isOpen: boolean;
  tempGoal: string;
  onChangeTempGoal: (value: string) => void;
  onSaveGoal: () => void;
  onClose: () => void;
}

export const CareerGoalModal: React.FC<CareerGoalModalProps> = ({
  isOpen,
  tempGoal,
  onChangeTempGoal,
  onSaveGoal,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="career-goal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-simple">
          <h3>Update Your Career Goal</h3>
          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body-simple">
          <label htmlFor="goal-input-field">Target Role or Objective</label>
          <input
            id="goal-input-field"
            type="text"
            value={tempGoal}
            onChange={(e) => onChangeTempGoal(e.target.value)}
            placeholder="e.g. Become a Senior Python Backend Developer"
          />
          <p className="goal-help-text">
            This objective dynamically tunes recommendations to bridge the gap toward your goal.
          </p>
        </div>

        <div className="modal-footer-simple">
          <button
            type="button"
            className="btn-cancel-simple"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-save-goal"
            onClick={onSaveGoal}
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerGoalModal;

