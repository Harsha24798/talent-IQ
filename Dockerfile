FROM node:21-alpine  
WORKDIR /app
COPY /backend/package*.json ./
RUN npm install
COPY ./backend ./
COPY ./frontend/dist ./
ENV PORT=3000
ENV DB_URL=mongodb+srv://harshamadushan98724_db_user:DohCLj953IhQE3xM@cluster0.wpf5b1j.mongodb.net/interview_db?appName=Cluster0
ENV NODE_ENV=production
ENV INNGEST_EVENT_KEY=1EUlFkV9gbfiI2r_y6nGsM_lmAdOXzjSpb5da43sUVcxqDaWdx6rUbjrCaOrICuqh8k52a8q3wE3KajiUsmt-A
ENV INNGEST_SIGNING_KEY=signkey-prod-5cd376e60fc652acd7b6ef6553d213257b65ae5800cdb1fd284dc637c5455575   
ENV STREAM_API_KEY=vngcgr3bbfkc
ENV STREAM_API_SECRET=ztgp5rmtgs7re5x66vq4gfgq7uzjk2mbn5mguj2ka6bpx348q63gwadtmhdvrb3z
ENV CLERK_PUBLISHABLE_KEY=pk_test_YW1wbGUtc3BhbmllbC00Ni5jbGVyay5hY2NvdW50cy5kZXYk
ENV CLERK_SECRET_KEY=sk_test_yTfLeOrRKCtkAr3qcQggt3VI52moUmitguNNMJi8f0
ENV CLIENT_URL=http://localhost:5173=value
EXPOSE 3000
CMD ["npm", "run", "start"]
