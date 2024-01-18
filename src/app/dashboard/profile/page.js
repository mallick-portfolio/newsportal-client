'use client'
import isAuth from "@/app/lib/utils/IsAuth";
import React from "react";

const Profile = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
      nostrum, iusto consectetur velit ad autem repudiandae, optio eos
      excepturi, quidem ut fuga enim omnis tempora placeat reiciendis! Nihil,
      corrupti vel!
    </div>
  );
};

export default isAuth(Profile);
