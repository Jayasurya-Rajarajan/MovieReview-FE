import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import { TroubleshootSharp } from "@mui/icons-material";
const Reviews = (props) => {

  return (
    <>
      <section>
        <Dialog
          fullWidth
          maxWidth={props.maxWidth}
          open={props.showReviewModal}
          onClose={props.handleCloseReviewModal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
          <DialogContent dividers="paper">
                {props.body}
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default Reviews;
